import { getRandom } from '../../helpers';
import './Bot.scss';

const Bot = ({
  displayBot,
  hideBot,
}: {
  displayBot: boolean;
  hideBot: () => void;
}) => {
  const botTexts = [
    'Well, well, well - look who was NOT listening when Garry Smith already asked the exact same question yesterday',
    'Boooooring...Garry Smith asked that yesterday',
    'Oh, did you know that a crocodile cannot stick its tongue out?',
    'Oh, did you know that almonds are a member of the peach family?',
    'Congratulations, you are the 10th person asking this question this week',
  ];

  const selectedText = getRandom(botTexts.length);

  return (
    <div
      className={`Bot airplane ${displayBot ? 'animate' : ''}`}
      onClick={hideBot}
    >
      <div className='banner-text'>{botTexts[selectedText]}</div>
    </div>
  );
};

export default Bot;
