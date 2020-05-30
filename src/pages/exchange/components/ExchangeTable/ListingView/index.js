import React from 'react';
import ListViewComponent from './ListingView';
import ListViewModule from './modules';
const { ListViewProvider } = ListViewModule;

const ListingView = () => {
  return (
      <ListViewProvider>
        <ListViewComponent title='Listings View' />
      </ListViewProvider>
    );
};

export default ListingView;

