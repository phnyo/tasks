import { useState } from 'react';
import { Detail, Task } from 'types';
import { DetailView } from './Detail.tsx';

type Status = 'Not Started' | 'In Progress' | 'Done' | 'Suspended';
type Filter = 'all' | 'ongoing' | 'todo' | 'removed';


export const App = () => {
  
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const handleSubmit = () => {
    if (!text) return;

    const newTask: Task = {
      value: text,
      id: new Date().getTime(),
      status: 'Not Started',
      details: [],
      subTasks: [],
    };

    setTasks(() => [newTask, ...tasks]);
    setText('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleEdit = (id: number, value: string) => {
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, value };
        }
      });
      return task;
    });

    return newTasks;
  };

  const handleDetail = (id: number, details: Detail[]) => {
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, details };
        }
      });
      
      return task;
    });

    return newTasks;
  };

  const handleCheck = (id: number, checked: boolean) => {
    
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          const status = checked ? 'Done' : 'In Progress';
          return { ...task, status };
        }
        
        return task;
      });

      return newTasks;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTasks((tasks) => {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, removed };
        }
        return task;
      });

      return newTasks;
    });
  };

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  }

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'all':
        return !(task.status === 'Suspended');
      case 'checked':
        return task.status === 'Done';
      case 'unchecked':
        return task.status === 'In Progress' | task.status === 'Not Started';
      case 'removed':
        return task.status === 'Suspended';
      default:
        return task;
    }
  });

  return (
    <div>
      <div>
        <select defaultValue="all" onChange={(e) => handleFilter(e.target.value as Filter)}>
          <option value="all">全てのタスク</option>
          <option value="checked">完了タスク</option>
          <option value="unchecked">現在のタスク</option>
          <option value="removed">ゴミ箱</option>
        </select>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <input 
            type="text"
            value={text}
            disabled={filter === 'checked' || filter === 'removed'}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="submit"
            value="追加"
            disabled={filter === 'checked' || filter === 'removed'}
            onSubmit={(e) => e.preventDefault()}
          />
        </form>
      </div>
      <div>
        <p>{ text }</p>
      </div>
      <div>
        <ul>
          {filteredTasks.map((task) => {
            return (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.status === 'Done'}
                  disabled={task.status === 'Suspended'}
                  onChange={() => handleCheck(task.id, !(task.status === 'Done'))}
                />
                <input
                  type="text"
                  disabled={task.status === 'Done' || task.status === 'Suspended' }
                  value={task.value}
                  onChange={(e) => handleEdit(task.id, e.target.value)}
                />
                <ul>
                <DetailView
                  id={ task.id }
                  handleDetail={ handleDetail }
                />
                </ul>
                <button onClick={() => handleRemove(task.id, !(task.status === 'Suspended'))}>
                {task.removed? '戻す': '削除'}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
