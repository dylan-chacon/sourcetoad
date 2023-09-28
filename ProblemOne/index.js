var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

const flatObject = (obj) => {
  const flattenObj = Object.keys(obj).reduce((result, key) => {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      return {
        ...result,
        ...obj[key],
      };
    }
    return { ...result, [key]: obj[key] };
  }, {});
  return flattenObj;
};

const sumInternalArray = (obj) => {
  for (const key in obj) {
    if (Array.isArray(obj[key]) && obj[key].every((num) => typeof num === 'number')) {
      const sum = obj[key].reduce((a, b) => a + b, 0);
      const modifiedObj = { ...obj, some_total: sum };
      delete modifiedObj[key];
      return modifiedObj;
    }
  }
  return obj;
};

function mutateArray(a) {
  const flattenArray = a.map((i) => flatObject(i));
  const sumArr = flattenArray.map((i) => sumInternalArray(i));
  const guestArr = sumArr.filter((i) => i.guest_type === 'guest');
  const sortArr = guestArr.sort((a, b) => {
    if (a.last_name < b.last_name) {
      return -1;
    }
    if (a.last_name > b.last_name) {
      return 1;
    }
    if (a.first_name < b.first_name) {
      return -1;
    }
    if (a.first_name > b.first_name) {
      return 1;
    }
    return 0;
  });
  
  return sortArr;
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
