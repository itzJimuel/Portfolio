import { useRef, useState } from 'react';
import { LuCircleAlert, LuCircleCheck, LuSend } from 'react-icons/lu';
import { profile } from '../../data/portfolio';
import Button from './Button';

/*
 * Front-end-only contact form (no server needed).
 *
 * Validation follows the ":user-invalid" pattern: a field only shows an error
 * after the visitor has typed in it and left it, or after they try to submit.
 * Errors are tied to inputs with aria-invalid + aria-describedby and use an
 * icon as well as color.
 *
 * On a valid submit it opens the visitor's email app with the message
 * pre-filled. To receive messages directly instead, see "Contact form" in
 * the README (Formspree / Netlify Forms).
 */

const ERROR_MESSAGES = {
  name: { valueMissing: 'Please enter your name.' },
  email: {
    valueMissing: 'Please enter your email address.',
    typeMismatch: 'Please enter a valid email address, like name@example.com.',
  },
  message: {
    valueMissing: 'Please write a message.',
    tooShort: 'Please write at least 10 characters.',
  },
};

/** Returns an error message for a form control, or null when it is valid. */
function getError(control) {
  const { validity, name } = control;
  if (validity.valid) return null;
  const messages = ERROR_MESSAGES[name] ?? {};
  const failed = Object.keys(messages).find((key) => validity[key]);
  return failed ? messages[failed] : control.validationMessage;
}

function Field({ label, name, error, as: Control = 'input', ...props }) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        <span aria-hidden="true" className="ml-0.5 text-accent">
          *
        </span>
      </label>
      <Control
        id={id}
        name={name}
        required
        className="field-input"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <LuCircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const edited = useRef(new Set()); // names of fields the visitor has typed in

  const updateError = (control) => setErrors((prev) => ({ ...prev, [control.name]: getError(control) }));

  const handleChange = (event) => {
    const control = event.target;
    edited.current.add(control.name);
    // Live-update an error that is already showing (e.g. clear it once fixed).
    if (errors[control.name]) updateError(control);
  };

  const handleBlur = (event) => {
    if (edited.current.has(event.target.name)) updateError(event.target);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const controls = [...form.elements].filter((el) => el.name && el.willValidate);

    const nextErrors = Object.fromEntries(controls.map((el) => [el.name, getError(el)]));
    setErrors(nextErrors);

    const firstInvalid = controls.find((el) => nextErrors[el.name]);
    if (firstInvalid) {
      setStatus('');
      firstInvalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const subject = `Portfolio message from ${data.name}`;
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus(`Thanks, ${data.name}! Your email app should open with the message ready to send.`);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <p className="mb-6 text-sm text-muted">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="sm:col-span-2">
          <Field
            as="textarea"
            label="Message"
            name="message"
            rows={5}
            minLength={10}
            placeholder={`Hi ${profile.name.split(' ')[0]}, I’d like to talk about…`}
            error={errors.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className="field-input resize-y"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg">
          <LuSend aria-hidden="true" />
          Send message
        </Button>
        <p className="text-xs text-muted sm:text-right">Opens your email app with the message filled in.</p>
      </div>

      {/* Live region: always rendered so screen readers announce new messages. */}
      <div role="status">
        {status && (
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-accent-soft px-4 py-3 text-sm text-fg">
            <LuCircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
