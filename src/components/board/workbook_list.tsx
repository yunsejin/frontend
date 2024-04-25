import React, {useState} from "react";
import {ListContainer, ListItem} from '../../styles/MainStyles'

interface Item{
    id: number;
    name: string;
}
interface ListComponentProps {
    items: Item[];
    onItemSelect: (item: Item) => void;
  }


  const ListComponent: React.FC<ListComponentProps> = ({ items, onItemSelect }) => {
    return (
      <ListContainer>
        {items.map(item => (
          <ListItem key={item.id} onClick={() => onItemSelect(item)}>
            {item.name}
          </ListItem>
        ))}
      </ListContainer>
    );
  };
  
  export default ListComponent;