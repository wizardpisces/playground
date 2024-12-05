import './App.css';
import SvgIcon from './components/SvgIcon';
const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <SvgIcon name="avatar" width={160} height={160} color="#000" onClick={() => alert('click')} />
    </div>
  );
};

export default App;
