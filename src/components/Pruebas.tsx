import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
class Pruebas extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        }
      ]
    }
  }
  render() {
  return (
        <Fragment>
          {/* Multi */}
          <SearchableDropdown
            onItemSelect={(items: any) => { sectorsFilter(items.id) }}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={CiudadesActuales}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Ciudad",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: (text:any) => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
      </Fragment>
  );
  }
}