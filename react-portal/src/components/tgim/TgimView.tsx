import './TgimView.css'

/**
 * TGIM (Task & Goal Intelligence Manager) — Parallax (Pure Tech / Russell Korus).
 *
 * Integration shape v1: iframe-to-hosted. Single source of truth lives at
 * https://tgim-command-center.netlify.app (Parallax-controlled). No credential
 * boundary is crossed; if/when TGIM exposes per-user auth this view will be
 * upgraded. Locked with Parallax in AgentMail msg 0100019e19f4507a
 * (thread 4994c50b, 2026-05-12).
 *
 * Default landing route within TGIM iframe = root dashboard. (Open Q to
 * Parallax — answer outstanding as of integration time. If Parallax confirms
 * a different default-route, change `TGIM_URL` constant.)
 */

const TGIM_URL = 'https://tgim-command-center.netlify.app'

export function TgimView() {
  return (
    <div className="tgim-view">
      <iframe
        className="tgim-iframe"
        src={TGIM_URL}
        title="TGIM — Task & Goal Intelligence Manager (Parallax)"
        // Permissive sandbox: TGIM is a Parallax-controlled Netlify site; we
        // need scripts/forms/same-origin for the SPA to function. No allow-top-navigation.
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="eager"
      />
    </div>
  )
}
