import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { updateBoard } from '../store/board.action';
import { boardService } from '../services/board.service';

export function _AddStory(props) {
    const {board, group, updateBoard} = props;
    const groupId = group.id;
    const groupIdx = board.groups.findIndex(group => group.id === groupId);

    const [newBoard, setNewBoard] = useState({...board});
    const[isTitleEditOn, toggleTitleEdit] = useState(false);

    const titleRef = React.createRef();

    const onToggleTitleEdit = () => {
        isTitleEditOn ? toggleTitleEdit(false) : toggleTitleEdit(true);
    }

    useEffect(() => {
        if(isTitleEditOn) titleRef.current.focus();
    }, [isTitleEditOn]);

    
}
