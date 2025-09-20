const presetSelect = document.getElementById("presetSelect");
const statusMessage = document.querySelector(".status-message");
const copyButton = document.getElementById("copyButton");

const fields = {
  role: document.getElementById("role"),
  objective: document.getElementById("objective"),
  instructions: document.getElementById("instructions"),
  context: document.getElementById("context"),
  goodExample: document.getElementById("goodExample"),
  badExample: document.getElementById("badExample"),
  constraints: document.getElementById("constraints"),
  outputStyle: document.getElementById("outputStyle"),
  outputFormat: document.getElementById("outputFormat"),
  outputVerbosity: document.getElementById("outputVerbosity"),
  thinkingEffort: document.getElementById("thinkingEffort"),
};

const presets = [
  {
    id: "careerCoach",
    label: "AI Career Coach (Joe)",
    values: {
      role: "You are an AI career coach named Joe developed by AdAstra Careers.",
      objective:
        "Guide users through thoughtful career planning and actionable next steps.",
      instructions:
        "Always stay in character as Joe. Probe for missing context before recommending solutions. Translate complicated career concepts into friendly, supportive language.",
      context:
        "You are coaching professionals visiting the AdAstra career portal. They usually juggle mid-career pivots, skill gaps, and confidence issues.",
      goodExample:
        "Coach: Let's unpack the roles you are considering. Which responsibilities excite you the most?\nUser: I'm drawn to analytics-heavy roles.\nCoach: Perfect. We'll prioritize paths that lean into research-heavy work, like product analytics or UX research.",
      badExample:
        "Coach: Here's a random job posting.\nUser: That doesn't match my skills.\nCoach: Oh, sorry. Maybe search again.",
      constraints:
        "Avoid prescribing legal or financial guidance. Keep answers under 275 words unless the user explicitly asks for more detail.",
      outputStyle: "Warm, encouraging, coaching tone with actionable phrasing.",
      outputFormat:
        "1. Quick recap of the user's situation\n2. Prioritized recommendations with justification\n3. Next steps checklist",
      outputVerbosity: "medium",
      thinkingEffort: "high",
    },
  },
  {
    id: "uxWriter",
    label: "UX Writer for App Notifications",
    values: {
      role: "You are a senior UX writer shaping push notifications for Aurora Fitness.",
      objective:
        "Craft motivating notifications that boost user re-engagement with the workout app.",
      instructions:
        "Write in second person, using short sentences. Include a single emoji when it reinforces motivation. Always A/B test two short variations.",
      context:
        "Users receive notifications at 7am local time. They often skip workouts mid-week. Emphasize momentum and community support.",
      goodExample:
        "Option A: Quick stretch squad is waiting. Roll out of bed and tap Start. 💪\nOption B: Your mid-week streak needs you. Let's press play now!",
      badExample:
        "Option A: Greetings valued user, your session should begin imminently.\nOption B: Reminder to exercise at 7am.",
      constraints:
        "Limit each notification line to 100 characters. Do not mention weight loss or dieting.",
      outputStyle: "Energetic, encouraging, modern language.",
      outputFormat:
        "- Situation insight\n- Two notification options\n- Microcopy rationale (bullets)",
      outputVerbosity: "concise",
      thinkingEffort: "medium",
    },
  },
];

function hydratePresetOptions() {
  presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.label;
    presetSelect.append(option);
  });
}

function handlePresetChange(event) {
  const selected = presets.find((preset) => preset.id === event.target.value);
  if (!selected) {
    return;
  }

  const { values } = selected;
  Object.entries(values).forEach(([key, value]) => {
    if (fields[key]) {
      if (fields[key] instanceof HTMLSelectElement) {
        fields[key].value = value;
      } else {
        fields[key].value = value;
      }
    }
  });

  announce(`Loaded the ${selected.label} preset.`);
}

function buildPromptPayload() {
  return `# Role\n${fields.role.value.trim()}\n\n# Objective\n${fields.objective.value.trim()}\n\n# Instructions\n${fields.instructions.value.trim()}\n\n# Context\n${fields.context.value.trim()}\n\n# Example(s)\n    ## Good Example\n    ${
    fields.goodExample.value.trim() || "(provide a strong example here)"
  }\n    ## Bad Example\n    ${
    fields.badExample.value.trim() || "(call out a pitfall here)"
  }\n\n# Constraints\n${
    fields.constraints.value.trim() || "(list constraints here)"
  }\n\n# Output Style\n${
    fields.outputStyle.value.trim() || "(describe tone/style here)"
  }\n\n# Output Format\n${
    fields.outputFormat.value.trim() || "(outline the desired structure here)"
  }\n\n# Output Verbosity\n    - ${
    fields.outputVerbosity.value
  }\n\n# Thinking Effort\n    - ${fields.thinkingEffort.value}`;
}

async function copyPrompt() {
  const payload = buildPromptPayload();

  try {
    await navigator.clipboard.writeText(payload);
    announce("Prompt copied to clipboard.");
  } catch (err) {
    fallbackCopy(payload);
  }
}

function fallbackCopy(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    announce("Prompt copied to clipboard.");
  } catch (err) {
    announce("Unable to copy automatically. Please copy manually.", true);
  }
  document.body.removeChild(temp);
}

function announce(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "#f87171" : "var(--accent)";
}

hydratePresetOptions();
presetSelect.addEventListener("change", handlePresetChange);
copyButton.addEventListener("click", copyPrompt);
