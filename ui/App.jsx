import './index.css';
import BackgroundRemoverUI from './BackgroundRemoverUI';

function App() {
  return (
    <div className="h-screen w-full bg-background-light dark:bg-background-dark font-display text-[#0d121b] antialiased overflow-hidden">
      <BackgroundRemoverUI />
    </div>
  );
}

export default App;
