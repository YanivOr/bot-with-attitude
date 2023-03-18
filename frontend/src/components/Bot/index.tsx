import './Bot.scss';

const Bot = ({ hideBot }: { hideBot: () => void }) => {
  return (
    <div className='Bot airplane' onClick={hideBot}>
      <div className='banner-text'>
        Well, well, well - look who was NOT listening when Garry Smith already
        asked the exact same question yesterday.
      </div>
    </div>
  );
};

export default Bot;
