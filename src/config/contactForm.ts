// Google Forms Contact Integration Configuration
// Update `formUrl` and field entry IDs below once you have your Google Form URL.

export const contactFormConfig = {
  // Google Form submission endpoint (ends with /formResponse)
  formUrl:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
    "https://docs.google.com/forms/d/e/1FAIpQLSel8-_89b_2shiYDcc5wvC2eaVFbVUHr4qNJO1AVo9b1qhhSQ/formResponse",

  // Mapped Google Form entry IDs
  fields: {
    name: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME || "entry.448683620",
    email: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL || "entry.1932007392",
    subject: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_SUBJECT || "entry.1677706999",
    message: process.env.NEXT_PUBLIC_GOOGLE_FORM_ENTRY_MESSAGE || "entry.1033761025",
  },
};
