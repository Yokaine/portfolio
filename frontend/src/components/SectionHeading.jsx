import Reveal from './Reveal.jsx'

export default function SectionHeading({ id, index, eyebrow, title, lead }) {
  return (
    <Reveal className={`section-head${lead ? ' has-lead' : ''}`}>
      <div>
        <p className="eyebrow">
          <span className="eyebrow-index">{index}</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  )
}
