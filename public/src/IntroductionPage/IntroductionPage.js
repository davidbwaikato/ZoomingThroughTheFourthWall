import './IntroductionPage.css'
import ConnectingButtons from "./ConnectingButtons";

const IntroductionPage = ({ socket }) => {

  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        {/* Change the logo here!! */}
        <h1>Fourth Wall</h1>
        {socket &&
          (socket.connected ? <ConnectingButtons /> : <div className="loader"></div>)
        }
      </div>
    </div>
  );
};

export default IntroductionPage;
