---
name: real-sfx
description: Generate real, realistic sound effects (SFX) — foley hits, whooshes, impacts, ambiences, UI/notification sounds, and other non-musical audio — from a text description, using the ElevenLabs sound-effects model. Use this whenever the user wants a sound effect for a video, short-form clip, podcast, app, or game: phrases like "I need a whoosh for this edit", "generate a door slam sound", "add a notification ding", "make me a rain ambience loop", or "give this transition some sfx" should trigger it. Not for music (use a music-generation tool/skill instead) and not for speech/voiceover (use text-to-speech).
---

# Real SFX

Generate short, realistic sound-effect clips from a text description using
ElevenLabs' sound-effects model (`eleven_text_to_sound_v2`), wired through the
`mcp__ElevenLabs__creative_*` tools. The model is good at one concrete,
specific sound at a time — a door slam, a whoosh, a glass break, a footstep
on gravel — not music and not speech.

## When to use this

Trigger on any request for a sound effect, foley, ambience bed, UI sound, or
"sfx" for a video/short/reel/podcast/game — even if the user doesn't say the
word "sound effect" explicitly (e.g. "this cut needs a whoosh", "what sound
should play when the user taps this button"). If the request is actually for
background music or a score, that's a different model (`music` node type) —
don't force it through this skill. If it's spoken dialogue or narration,
that's text-to-speech, not this.

## Writing the prompt

The model rewards short, concrete, literal descriptions over flowery ones.
One sentence or fragment, naming:

1. **The sound itself** — what is physically making the noise.
2. **Texture/pitch/transient** — "crisp", "deep", "metallic", "soft thud",
   "sharp crack".
3. **The space**, if it matters — "in a large hall", "close-mic", "distant",
   "outdoors".

Good:
- `Heavy wooden door slamming shut, deep resonant thud, faint frame rattle`
- `Hydraulic sci-fi door sliding open with a pressurized hiss`
- `Glass shattering on concrete, sharp bright transient`
- `Crackling campfire, close-mic, occasional pop`

Avoid cinematic/visual language ("epic", "dramatic reveal") — it doesn't
translate to audio and wastes the prompt's steering power. If the user asks
for several distinct sounds ("a whoosh AND a thud AND a ding"), generate each
as its **own node/generation** — layering unrelated sounds into one prompt
blurs them together into mush. If they later want them mixed into one clip,
combine the generated clips with a `composition` node rather than
re-prompting.

If the user's ask is vague ("make this feel punchier", "something for this
transition"), ask what's happening on screen/in the moment, or make a
reasonable concrete guess from context and say what you picked.

## Parameters

Set these via `model_parameters` on the sfx node (defaults are fine for a
typical one-shot effect — only override when the request calls for it):

- **`duration_seconds`** (0.5–30): leave unset for the model's default length
  unless the user needs a specific length (e.g. "exactly 2 seconds so it fits
  this cut"). Long durations tend to drift or start looping awkwardly on
  their own — if someone wants a long ambience bed, prefer a short loopable
  clip (see `loop` below) over asking for 20+ seconds directly.
- **`loop`** (boolean, default `false`): set `true` for ambience beds and
  continuous textures meant to play underneath something — rain, fire,
  engine hum, wind, crowd murmur. Leave `false` for one-shot hits — door
  slams, impacts, whooshes, dings, breaks.
- **`prompt_influence`** (0–1, default `0.3`): how strictly the model follows
  the literal prompt vs. taking creative liberty. Raise toward `1` when the
  user is specific and wants exactly that sound reproduced faithfully; lower
  toward `0` (or leave default) when they want some natural variation/texture
  and a stricter match sounds mechanical.

## Workflow

1. **Simple case — one sound, default settings:** call
   `mcp__ElevenLabs__creative_generate_in_flow` with `node_type: "sfx"`,
   `model_id: "eleven_text_to_sound_v2"`, and the prompt. Omit `flow_id`
   unless this sound needs to end up composited with other clips (video,
   music, voiceover) — in that case call `creative_create_flow` first and
   pass its `flow_id` to every related call, since nodes on different flows
   can't be wired together.

2. **Needs custom duration/loop/prompt_influence:** use the two-step path
   instead, since `creative_generate_in_flow` doesn't take
   `model_parameters`:
   - `creative_add_flow_node` with `node_type: "sfx"`,
     `model_id: "eleven_text_to_sound_v2"`, `prompt`, and
     `model_parameters` (whichever of the three above apply).
   - `creative_run_flow_nodes` with the returned `flow_id` and `node_ids`.

3. **Multiple distinct sounds:** repeat step 1 or 2 once per sound (its own
   node/generation each), on the same `flow_id` if they'll later be
   composited together.

4. **Poll for completion:** call `creative_get_flow_run_status` with the
   `flow_id` and `session_ids` from step 1/2, waiting `poll_after_seconds`
   between calls, until `all_completed` or `has_failures` is true. Never
   re-call the generation tool to "retry" — that starts and charges a second
   generation.

5. **Deliver the result:** the completed `creative_get_flow_run_status`
   response already includes each generation's downloadable `content_url`
   (and the same under `media[].url`) on `elevenlabsusercontent.com` —
   no extra tool call needed to get it. Download the file(s) and hand them
   to the user with your file-delivery tool (e.g. `SendUserFile`), so they
   get an actual audio file, not just a link. Also mention the flow's canvas
   URL (`flow_url`, from the generation call) so they can pick between
   variations, re-roll texture, or layer it into a composition themselves.

## Picking a variation

A run produces several takes by default (`generations_count`, default 4) so
the user can choose. Read the `generation_id`s off the run status in the
order they're listed — "the second take" is the second entry — and only
download/deliver the one they pick (or all of them if they didn't specify,
letting them choose from the delivered files).
