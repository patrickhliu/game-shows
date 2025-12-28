//import React, { useCallback, useState, useEffect, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import type { Episode } from '../../interfaces/jeopardy.ts';

interface Args {
   label: string,
   episodes: Episode[],
   sendToParent: (x:string) => void,
   sendShowNo: (episode: Episode) => void,
}

const DropDown:React.FC<Args> = ({ label, episodes, sendToParent, sendShowNo, }) => {

    return (
        <DropdownButton id="dropdown-basic-button" title={ label } onClick={ () => sendToParent(label) }>
            {
                episodes.map((e, index) => {
                    return (
                        <Dropdown.Item className="text-center" key={ index } onClick={ () => { sendShowNo(e) }}>{ e.air_date}</Dropdown.Item>
                    );
                })
            }
        </DropdownButton>
    )
}

export default DropDown;
