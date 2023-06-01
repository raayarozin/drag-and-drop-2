import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from './Button';
import { useState } from 'react';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const [editingBtn, setEditingBtn] = useState('🖌');
  const [isEditing, setIsEditing] = useState(false);
  const [doneBtn, setIsDoneBtn] = useState('+');
  const [isDone, setIsDone] = useState(false);

  const toggleEditInput = (e) => {
    e.preventDefault();
    if (isEditing) {
      setIsEditing(false);
      setEditingBtn('-');
    } else {
      setIsEditing(true);
      setEditingBtn('🖌');
    }
  };

  const handleDoneBtn = () => {
    if (isDone) {
      setIsDone(false);
      setIsDoneBtn('+');
    } else {
      setIsDone(true);
      setIsDoneBtn('✔');
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`todo-item-container isDone-${isDone}`}
        id={`todo-item-container-${props.id}`}
        key={props.id}
      >
        <div
          id={`current-todo-${props.id}`}
          className={`todo-item todo-item-visible-${isEditing}`}
        >
          {props.id}
        </div>
        <div
          id={`current-todo-container-${props.id}`}
          className={`edit-todo-container edited-item-visible-${isEditing}`}
        >
          <input
            type='text'
            className='edit-input'
            defaultValue={props.id}
            id={`edit-todo-input-${props.id}`}
          />
          <Button
            type='submit'
            className='save-btn'
            btnValue='Save'
            onClick={(e) => {
              props.editExistingTodo(
                e,
                props.id,
                document.getElementById(`edit-todo-input-${props.id}`).value
              );
            }}
          />
        </div>
        <div className='todo-item-edit-delete-btns-container'>
          <Button
            className='edit-btn'
            btnValue={editingBtn}
            onClick={(e) => {
              toggleEditInput(e);
            }}
          />
          <Button
            className='delete-btn'
            btnValue='x'
            onClick={(e) => {
              props.deleteTodo(e, props.id);
            }}
          />
          <Button
            className='mark-as-done-btn'
            btnValue={doneBtn}
            onClick={(e) => {
              handleDoneBtn();
              props.handleIsTodoDone(e, props.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SortableItem;
