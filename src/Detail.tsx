import { useState } from 'react';
import { Detail } from 'types';

export const DetailView = ({ taskId: integer, setTaskDetail }) => {

  const [visible, setVisible] = useState(true);
  const [text, setText] = useState('');
  const [detail, setDetail] = useState<Detail[]>([]);

  const handleVisible = () => {
    setVisible(!visible);
  }
  
  const handleDetail = () => {
    if (!text) return;

    const newDetail: Detail = {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      value: text,
    };

    setText('');
    setDetail(() => [newDetail, ...detail]);

    setTaskDetail(taskId, detail);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  if (detail.length === 0) {
    return (
      <div className={ 'detail' }>
        <div style={{ display: visible ? 'none' : 'block' }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleDetail();
          }}>
            <input
              type="text"
              value={ text }
              onChange={(e) => handleChange(e)}
            />
            <input
              type="submit"
              value="add detail"
              onChange={(e) => e.preventDefault()}
            />
          </form>
        </div>
        <button onClick={() => handleVisible()}> { visible ? 'show details' : 'hide details' } </button>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ display: visible ? 'none' : 'block' }}>
        {detail.map((det) => {
          return (
            <li key={det.id}>
              <div>
                <p>{ det.date } { det.value }</p>
              </div>
            </li>
          );
        })}
          <form onSubmit={(e) => {
            e.preventDefault();
            handleDetail();
          }}>
            <input
              type="text"
              value={ text }
              onChange={(e) => handleChange(e)}
            />
            <input
              type="submit"
              value="add detail"
              onChange={(e) => e.preventDefault()}
            />
          </form>
        </div>
        <button onClick={() => handleVisible()}> { visible ? 'show details' : 'hide details' } </button>
      </div>
    )
  }
}

