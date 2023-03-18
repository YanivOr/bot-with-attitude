import './MessageBubble.scss';

const MessageBubble = ({
  bubbleType,
  _id,
  type,
  nickname,
  message,
  msgClicked,
}: {
  bubbleType: string | null;
  _id: string;
  type: string;
  nickname: string;
  message: string;
  msgClicked: (_id: string) => void;
}) => {
  switch (bubbleType) {
    case 'bot': {
      const { q, a } = JSON.parse(message);

      return (
        <div className='MessageBubbleBot'>
          <div className='msg'>
            <div className='header'>
              <div className='bot'></div>
              <div
                className='speech-bubble'
                dangerouslySetInnerHTML={{
                  __html: 'Actually, this question was asked before',
                }}
              />
            </div>
            <div className='msg-block'>
              <div className='user'>
                {q.nickname} <span className='action'>asked:</span>
              </div>
              <span>{q.message}</span>
            </div>
            <div className='msg-block'>
              <div className='user'>
                {a.nickname} <span className='action'>answered:</span>
              </div>
              <span>{a.message}</span>
            </div>
          </div>
        </div>
      );
    }
    case 'bot-notice': {
      return (
        <div className='MessageBubbleBot'>
          <div className='msg'>
            <div className='header'>
              <div className='bot'></div>
              <div
                className='speech-bubble'
                dangerouslySetInnerHTML={{ __html: message }}
              />
            </div>
          </div>
        </div>
      );
    }
    case 'mine':
    default: {
      return (
        <div
          className={`MessageBubble ${bubbleType === 'mine' ? 'mine' : ''}`}
          key={_id}
        >
          <div className='msg' onClick={() => type === 'Q' && msgClicked(_id)}>
            <div className='user'>{nickname}</div>
            <span>{message}</span>
          </div>
        </div>
      );
    }
  }
};

export default MessageBubble;
