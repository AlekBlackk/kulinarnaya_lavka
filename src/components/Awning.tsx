// Полосатая маркиза «лавки»: планка с прострочкой сверху и свисающие фестоны с объёмом ткани.
// Фестоны — отдельные элементы, чтобы при прокрутке они легко «колыхались» волной (см. globals.css).
// 80 штук по 32px хватает на экран шириной 2560px; лишнее скрыто по ширине контейнера.
const PANELS = 80;

export function Awning() {
  return (
    <div className="awning" aria-hidden="true">
      <div className="awning-trim" />
      <div className="awning-panels">
        {Array.from({ length: PANELS }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
