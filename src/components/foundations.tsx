export function Foundations() {
  return (
    <div className="foundations">
      <section>
        <div className="foundation-title">
          <h2>Color</h2>
          <span>01</span>
        </div>
        <div className="color-grid">
          {[
            'background',
            'foreground',
            'primary',
            'secondary',
            'muted',
            'accent',
            'border',
            'destructive',
          ].map((c) => (
            <div className="color-token" key={c}>
              <div style={{ background: `var(--${c})` }} />
              <span>{c}</span>
              <code>--{c}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="foundation-title">
          <h2>Typography</h2>
          <span>02</span>
        </div>
        <div className="type-sample">
          <p className="text-5xl tracking-tight">Inter</p>
          <span className="mono">Aa Bb Cc Dd Ee Ff Gg 0123456789</span>
        </div>
        {[
          { label: 'Heading', size: 32 },
          { label: 'Title', size: 24 },
          { label: 'Body', size: 14 },
          { label: 'Label', size: 12 },
        ].map((t) => (
          <div className="type-row" key={t.label}>
            <span>{t.label}</span>
            <p style={{ fontSize: t.size }}>The quick brown fox</p>
            <code>{t.size}px</code>
          </div>
        ))}
      </section>
      <div className="foundation-pair">
        <section>
          <div className="foundation-title">
            <h2>Spacing</h2>
            <span>03</span>
          </div>
          {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
            <div className="spacing-row" key={n}>
              <code>{n.toString().padStart(2, '0')}</code>
              <div style={{ width: n * 3 }} />
            </div>
          ))}
        </section>
        <section>
          <div className="foundation-title">
            <h2>Radius</h2>
            <span>04</span>
          </div>
          <div className="radius-grid">
            {[0, 4, 8, 12, 16, 999].map((n) => (
              <div key={n}>
                <div style={{ borderRadius: n }} />
                <code>{n === 999 ? 'Full' : n + 'px'}</code>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
