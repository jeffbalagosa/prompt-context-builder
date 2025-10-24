const presetSelect = document.getElementById("presetSelect");
const statusMessage = document.querySelector(".status-message");
const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");
const presetPicker = document.querySelector(".preset-picker");
const formatSelect = document.getElementById("formatSelect");

// Auto-save constants
const STORAGE_KEY = 'promptBuilderDraft';
const STORAGE_FORMAT_KEY = 'promptBuilderFormat';
const DEBOUNCE_DELAY = 500;

let customPresetSelectReady = false;
let syncCustomPresetUI = () => {};

const formatToggleDescription = document.getElementById("formatToggleDescription");
const formatOptionMarkdown = formatSelect
  ? formatSelect.querySelector(".format-toggle__option--markdown")
  : null;
const formatOptionXML = formatSelect
  ? formatSelect.querySelector(".format-toggle__option--xml")
  : null;

function updateFormatToggleState(isXML) {
  if (!formatSelect) {
    return;
  }

  formatSelect.setAttribute("aria-checked", String(isXML));
  formatSelect.dataset.format = isXML ? "xml" : "markdown";

  if (formatOptionMarkdown) {
    formatOptionMarkdown.classList.toggle("is-active", !isXML);
  }

  if (formatOptionXML) {
    formatOptionXML.classList.toggle("is-active", isXML);
  }

  if (formatToggleDescription) {
    formatToggleDescription.textContent = `Current format: ${isXML ? "XML" : "Markdown"}`;
  }

  // Save format preference
  saveFormatPreference(isXML);
}

if (formatSelect) {
  // Load saved format preference first, then set up event listeners
  loadFormatPreference();

  formatSelect.addEventListener("click", () => {
    const isCurrentlyXML = formatSelect.dataset.format === "xml";
    updateFormatToggleState(!isCurrentlyXML);
  });

  formatSelect.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      updateFormatToggleState(true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      updateFormatToggleState(false);
    }
  });
}

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

// Auto-save utility functions
function saveFormData() {
  const formData = {};
  Object.entries(fields).forEach(([key, field]) => {
    if (field) {
      formData[key] = field.value;
    }
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (err) {
    console.warn('Failed to save form data:', err);
  }
}

function loadFormData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const formData = JSON.parse(savedData);
      Object.entries(formData).forEach(([key, value]) => {
        if (fields[key] && value !== undefined) {
          fields[key].value = value;
        }
      });
    }
  } catch (err) {
    console.warn('Failed to load form data:', err);
  }
}

function clearFormData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear form data:', err);
  }
}

function saveFormatPreference(isXML) {
  try {
    localStorage.setItem(STORAGE_FORMAT_KEY, JSON.stringify(isXML));
  } catch (err) {
    console.warn('Failed to save format preference:', err);
  }
}

function loadFormatPreference() {
  try {
    const savedFormat = localStorage.getItem(STORAGE_FORMAT_KEY);
    if (savedFormat !== null) {
      const isXML = JSON.parse(savedFormat);
      updateFormatToggleState(isXML);
    }
  } catch (err) {
    console.warn('Failed to load format preference:', err);
  }
}

// Debounce helper
let saveTimeout;
function debouncedSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveFormData, DEBOUNCE_DELAY);
}

// Reset form function
function resetForm() {
  // Clear all field values
  Object.values(fields).forEach(field => {
    if (field) {
      if (field instanceof HTMLSelectElement) {
        // Reset selects to first option (default)
        field.selectedIndex = 0;
      } else {
        // Clear textareas and inputs
        field.value = '';
      }
    }
  });

  // Clear localStorage data
  clearFormData();

  // Reset preset selector
  presetSelect.value = '';
  syncCustomPresetUI('');

  // Reset format toggle to Markdown
  updateFormatToggleState(false);

  // Show confirmation message
  announce('Form reset successfully.');
}

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
  {
    id: "healthCoach",
    label: "AI Health & Wellness Coach",
    values: {
      role: "You are an AI wellness coach guiding users toward healthier daily habits.",
      objective:
        "Provide simple, sustainable lifestyle advice on fitness, sleep, and nutrition.",
      instructions:
        "Ask clarifying questions before making recommendations. Use motivational interviewing style to support behavior change.",
      context:
        "Users are busy professionals who struggle to balance health with demanding work schedules.",
      goodExample:
        "Coach: What’s your current sleep routine like?\nUser: I usually go to bed past midnight.\nCoach: Thanks for sharing. Let’s set a small step: aim to be in bed 15 minutes earlier tonight. Over a week, that’s nearly 2 extra hours of rest.",
      badExample:
        "Coach: Just sleep 8 hours.\nUser: I can’t because of work.\nCoach: Then you’re out of luck.",
      constraints:
        "Avoid giving medical diagnoses. Recommendations must be general and habit-based.",
      outputStyle: "Supportive, practical, conversational.",
      outputFormat:
        "1. Identify key challenge\n2. Suggest one or two small, realistic adjustments\n3. Motivational closing line",
      outputVerbosity: "medium",
      thinkingEffort: "medium",
    },
  },
  {
    id: "languageTutor",
    label: "Spanish Language Tutor",
    values: {
      role: "You are a patient Spanish tutor helping English speakers build fluency.",
      objective:
        "Teach vocabulary and grammar through real-life conversations and practice exercises.",
      instructions:
        "Always provide both Spanish and English translations. Encourage the user to respond in Spanish. Correct mistakes gently with explanations.",
      context:
        "Users are adult learners aiming to use Spanish for travel and basic daily interactions.",
      goodExample:
        "Tutor: How do you say 'I would like a coffee' in Spanish?\nUser: Quiero café.\nTutor: Good try! The polite way is 'Me gustaría un café.' Both are correct, but one is more formal.",
      badExample:
        "Tutor: Repeat after me: café.\nUser: Café.\nTutor: Okay. Next.",
      constraints:
        "Keep lessons under 5 exchanges unless the user asks for more. Use beginner-friendly language.",
      outputStyle: "Friendly, patient, interactive.",
      outputFormat:
        "- Vocabulary phrase with translation\n- Short practice exercise\n- Encouragement and correction",
      outputVerbosity: "concise",
      thinkingEffort: "medium",
    },
  },
  {
    id: "startupAdvisor",
    label: "AI Startup Advisor",
    values: {
      role: "You are an AI startup advisor mentoring early-stage founders.",
      objective:
        "Help founders validate ideas, design lean experiments, and prepare for funding.",
      instructions:
        "Always frame feedback in terms of risks, opportunities, and actionable next steps. Ask for specifics about the business model before advising.",
      context:
        "Users are first-time entrepreneurs with limited resources, seeking clarity on product-market fit and funding.",
      goodExample:
        "Founder: I want to build an AI app for students.\nAdvisor: That’s broad. Who exactly are the students? University, high school, or adult learners? Let’s narrow the customer segment and test with 5 interviews.",
      badExample:
        "Founder: I want to build an AI app.\nAdvisor: Cool, launch it on App Store and see what happens.",
      constraints:
        "Do not promise guaranteed success. Keep answers practical and resource-conscious.",
      outputStyle: "Candid, supportive, focused on lean startup principles.",
      outputFormat:
        "1. Restate founder’s idea clearly\n2. Identify biggest assumptions or risks\n3. Recommend one immediate experiment",
      outputVerbosity: "medium",
      thinkingEffort: "high",
    },
  },
];

// Utility: escape string for XML
function escapeXML(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;") // must run first
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function hydratePresetOptions() {
  presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.label;
    presetSelect.append(option);
  });
}

function initPresetCustomSelect() {
  if (customPresetSelectReady || !presetPicker || !presetSelect) {
    return;
  }

  const wrapper = presetPicker.querySelector('[data-select="presetSelect"]');
  if (!wrapper) {
    return;
  }

  const trigger = wrapper.querySelector('.custom-select__trigger');
  const labelEl = wrapper.querySelector('.custom-select__label');
  const optionsList = wrapper.querySelector('.custom-select__options');

  if (!trigger || !labelEl || !optionsList) {
    return;
  }

  const listId = presetSelect.id + 'Options';
  optionsList.id = listId;
  trigger.setAttribute('aria-controls', listId);
  optionsList.setAttribute('aria-hidden', 'true');

  const buildOptions = () => {
    optionsList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    Array.from(presetSelect.options).forEach((option) => {
      const item = document.createElement('li');
      item.className = 'custom-select__option';
      item.setAttribute('role', 'option');
      item.dataset.value = option.value;
      item.textContent = option.textContent;
      item.tabIndex = -1;
      item.setAttribute('aria-selected', 'false');
      fragment.appendChild(item);
    });
    optionsList.appendChild(fragment);
  };

  buildOptions();

  const getOptionNodes = () =>
    Array.from(optionsList.querySelectorAll('.custom-select__option'));

  let isOpen = false;

  syncCustomPresetUI = (value = presetSelect.value) => {
    const options = getOptionNodes();
    const selectedOption =
      Array.from(presetSelect.options).find((opt) => opt.value === value) ||
      presetSelect.options[0];
    const labelText = selectedOption ? selectedOption.textContent : 'Select a preset...';
    labelEl.textContent = labelText;
    trigger.dataset.selected = value ? 'true' : 'false';
    options.forEach((node) => {
      const isSelected = node.dataset.value === value;
      node.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      node.classList.toggle('is-selected', isSelected);
    });
  };

  function openMenu(focusStrategy) {
    if (isOpen) {
      return;
    }

    isOpen = true;
    wrapper.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    optionsList.setAttribute('aria-hidden', 'false');

    const options = getOptionNodes();
    if (options.length) {
      let active = options.find((node) => node.dataset.value === presetSelect.value) || options[0];

      if (focusStrategy === 'first') {
        active = options[0];
      } else if (focusStrategy === 'last') {
        active = options[options.length - 1];
      }

      if (active) {
        requestAnimationFrame(() => {
          active.focus();
          const offset =
            active.offsetTop - optionsList.clientHeight / 2 + active.clientHeight / 2;
          optionsList.scrollTop = Math.max(offset, 0);
        });
      }
    }

    document.addEventListener('click', handleDocumentClick);
  }

  function closeMenu(focusTrigger = false) {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    wrapper.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    optionsList.setAttribute('aria-hidden', 'true');
    document.removeEventListener('click', handleDocumentClick);

    if (focusTrigger) {
      trigger.focus();
    }
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu(true);
    } else {
      openMenu();
    }
  }

  function handleDocumentClick(event) {
    if (!wrapper.contains(event.target)) {
      closeMenu();
    }
  }

  function focusOptionByIndex(index) {
    const options = getOptionNodes();
    if (!options.length) {
      return;
    }

    const clamped = Math.max(0, Math.min(index, options.length - 1));
    options[clamped].focus();
  }

  function handleTriggerKeydown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        openMenu(event.key === 'ArrowUp' ? 'last' : 'first');
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      closeMenu(true);
    }
  }

  function handleOptionKeydown(event) {
    const options = getOptionNodes();
    const currentIndex = options.indexOf(event.target);

    if (currentIndex === -1) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusOptionByIndex(Math.min(currentIndex + 1, options.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusOptionByIndex(Math.max(currentIndex - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        focusOptionByIndex(0);
        break;
      case 'End':
        event.preventDefault();
        focusOptionByIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(event.target.dataset.value);
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu(true);
        break;
      default:
        break;
    }
  }

  function selectOption(value) {
    presetSelect.value = value;
    presetSelect.dispatchEvent(new Event('change', { bubbles: true }));
    closeMenu(true);
  }

  optionsList.addEventListener('click', (event) => {
    const option = event.target.closest('.custom-select__option');

    if (!option) {
      return;
    }

    event.preventDefault();
    selectOption(option.dataset.value);
  });

  optionsList.addEventListener('keydown', handleOptionKeydown);

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
  });

  trigger.addEventListener('keydown', handleTriggerKeydown);

  presetSelect.addEventListener('change', () => syncCustomPresetUI());

  presetPicker.classList.add('custom-select-ready');
  syncCustomPresetUI();
  customPresetSelectReady = true;
}

function handlePresetChange(event) {
  const { value } = event.target;
  const selected = presets.find((preset) => preset.id === value);
  if (!selected) {
    syncCustomPresetUI(value);
    return;
  }

  // Clear saved data when preset is selected
  clearFormData();

  const { values } = selected;
  Object.entries(values).forEach(([key, mappedValue]) => {
    if (fields[key]) {
      if (fields[key] instanceof HTMLSelectElement) {
        fields[key].value = mappedValue;
      } else {
        fields[key].value = mappedValue;
      }
    }
  });

  syncCustomPresetUI(value);
  announce('Loaded the ' + selected.label + ' preset.');
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

function buildXMLPayload() {
  const role = escapeXML(fields.role.value.trim());
  const objective = escapeXML(fields.objective.value.trim());
  const instructions = escapeXML(fields.instructions.value.trim());

  const contextRaw = fields.context.value.trim();
  const context = contextRaw ? escapeXML(contextRaw) : null;

  const goodRaw = fields.goodExample.value.trim();
  const badRaw = fields.badExample.value.trim();
  const good = goodRaw ? escapeXML(goodRaw) : null;
  const bad = badRaw ? escapeXML(badRaw) : null;

  const constraintsRaw = fields.constraints.value.trim();
  const constraints = constraintsRaw ? escapeXML(constraintsRaw) : null;

  const outputStyleRaw = fields.outputStyle.value.trim();
  const outputStyle = outputStyleRaw ? escapeXML(outputStyleRaw) : null;
  const outputFormatRaw = fields.outputFormat.value.trim();
  const outputFormat = outputFormatRaw ? escapeXML(outputFormatRaw) : null;
  const verbosity = escapeXML(fields.outputVerbosity.value || "");
  const thinking = escapeXML(fields.thinkingEffort.value || "");

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<prompt>\n';
  xml += `  <role>${role}</role>\n`;
  xml += `  <objective>${objective}</objective>\n`;
  xml += `  <instructions>${instructions}</instructions>\n`;
  xml += context ? `  <context>${context}</context>\n` : `  <context />\n`;
  xml += '  <examples>\n';
  xml += good ? `    <good>${good}</good>\n` : `    <good />\n`;
  xml += bad ? `    <bad>${bad}</bad>\n` : `    <bad />\n`;
  xml += '  </examples>\n';
  xml += constraints ? `  <constraints>${constraints}</constraints>\n` : `  <constraints />\n`;
  xml += '  <output>\n';
  xml += outputStyle ? `    <style>${outputStyle}</style>\n` : `    <style />\n`;
  xml += outputFormat ? `    <format>${outputFormat}</format>\n` : `    <format />\n`;
  xml += `    <verbosity>${verbosity}</verbosity>\n`;
  xml += '  </output>\n';
  xml += `  <thinkingEffort>${thinking}</thinkingEffort>\n`;
  xml += '</prompt>';

  return xml;
}

async function copyPrompt() {
  const isXML = formatSelect ? formatSelect.dataset.format === "xml" : false;
  const payload = isXML ? buildXMLPayload() : buildPromptPayload();

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

// Set up auto-save listeners for all form fields
Object.values(fields).forEach(field => {
  if (field) {
    field.addEventListener('input', debouncedSave);
  }
});

// Initialize app
hydratePresetOptions();
initPresetCustomSelect();

// Restore saved data on page load
loadFormData();

presetSelect.addEventListener("change", handlePresetChange);
copyButton.addEventListener("click", copyPrompt);
resetButton.addEventListener("click", resetForm);
