import React from 'react';
import Item from './Item';

function SearchResults(props){
    let results = props.searchedItems.map((item)=> {
        var itemProps = {
            ...item,
            key: item.id,
        }
        return <Item {...itemProps}/>
    })
    return (
        <>
         {results}
        </>
    )
}

export default SearchResults;