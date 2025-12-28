//import React, { useCallback, useState, useEffect, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

interface Episode {
  show_no: string,
  air_date: string,
}

interface Args {
   label: string,
   episodes: Episode[],
   sendToParent: (x:string) => void,
   sendShowNo: (x:string) => void,
}

const DropDown:React.FC<Args> = ({ label, episodes, sendToParent, sendShowNo, }) => {

    return (
        <DropdownButton id="dropdown-basic-button" title={ label } onClick={ () => sendToParent(label) }>
            {
                episodes.map((e, index) => {
                    return (
                        <Dropdown.Item className="text-center" key={ index } onClick={ () => { sendShowNo(e.show_no) }}>{ e.air_date}</Dropdown.Item>
                    );
                })
            }
        </DropdownButton>
    )
}

export default DropDown;
