import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import mountain from './assets/mountain.png';
import logo from './assets/brand-logo.png';

const inputClass =
  'w-full rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-stone-800 placeholder:text-stone-400 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/20';

const roles = [
  { id: 'CITIZEN', icon: '🤝', title: 'Citizen', text: 'Ask for help or volunteer' },
  { id: 'NGO', icon: '🏢', title: 'NGO', text: 'Run campaigns and relief work' },
];

const demoAccounts = ['admin@reliefbridge.com', 'ngo@reliefbridge.com', 'citizen@reliefbridge.com'];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">{label}</span>
      {children}
    </label>
  );
}

function PasswordInput({ value, onChange, placeholder = '••••••••' }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} pr-16`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-3 text-sm font-medium text-green-800 hover:underline"
      >
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default function LoginRegister() {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('CITIZEN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [skills, setSkills] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login: role is decided by the email text
    const assignedRole = email.includes('admin') ? 'ADMIN' : email.includes('ngo') ? 'NGO' : 'CITIZEN';
    login('Anuradha K.', assignedRole);
    navigate('/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock register: sign the new user in with the chosen role
    login(fullName || 'New User', role);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-[#F4F8F3]">
      {/* Left: nature panel (hidden on mobile) */}
      <aside
        className="relative hidden w-1/2 flex-col justify-between bg-cover bg-center p-12 text-white lg:flex"
        style={{ backgroundImage: `url(${mountain})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/70 via-green-900/55 to-green-950/85" />
        <div className="relative flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 rounded-lg bg-white/90 object-contain p-1" />
          <span className="text-xl font-bold tracking-tight">ReliefBridge</span>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Together, we rebuild.</h1>
          <p className="mt-4 text-lg text-green-50/90">
            Connect donors, volunteers and NGOs so help reaches disaster-hit families faster, with every donation tracked.
          </p>
        </div>
        <p className="relative text-sm text-green-100/80">Service to man is service to God.</p>
      </aside>

      {/* Right: one card, two modes */}
      <main className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-green-900/10">
          {/* Mobile brand */}
          <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-green-900">ReliefBridge</span>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex rounded-lg bg-stone-100 p-1">
            {['login', 'register'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                  mode === m ? 'bg-white text-green-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {m === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-green-900">Welcome back</h2>
              <p className="mb-6 mt-1 text-stone-500">Log in to continue your relief work.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <Field label="Email address">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Password">
                  <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                </Field>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-stone-600">
                    <input type="checkbox" className="accent-green-700" /> Remember me
                  </label>
                  <button type="button" className="font-medium text-green-800 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-800 py-3 font-bold text-white transition hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                >
                  Log in
                </button>
              </form>

              <div className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-stone-600">
                <p className="mb-2 font-medium text-green-900">Demo accounts (click to fill)</p>
                <div className="flex flex-wrap gap-2">
                  {demoAccounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setEmail(a)}
                      className="rounded-full border border-green-200 bg-white px-3 py-1 text-xs text-green-900 hover:bg-green-100"
                    >
                      {a.split('@')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-green-900">Join ReliefBridge</h2>
              <p className="mb-6 mt-1 text-stone-500">Create an account and start helping.</p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <span className="mb-2 block text-sm font-medium text-stone-700">I am registering as a</span>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`rounded-xl border p-3 text-left transition ${
                          role === r.id
                            ? 'border-green-700 bg-green-50 ring-2 ring-green-700/20'
                            : 'border-stone-300 hover:border-green-600'
                        }`}
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <span className="mt-1 block font-semibold text-stone-800">{r.title}</span>
                        <span className="block text-xs text-stone-500">{r.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Field label={role === 'NGO' ? 'Organization name' : 'Full name'}>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={role === 'NGO' ? 'Your organization' : 'Your full name'}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email address">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Password">
                  <PasswordInput value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                </Field>

                {role === 'CITIZEN' && (
                  <Field label="Your skills (optional)">
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. first aid, driving, cooking"
                      className={inputClass}
                    />
                  </Field>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-800 py-3 font-bold text-white transition hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                >
                  Create account
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}