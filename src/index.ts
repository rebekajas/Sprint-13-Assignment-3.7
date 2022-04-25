import fetch from 'node-fetch'

interface CustomerItem {
    id: number;
    name: string;
    address: {
        street: string;
        suite: string;
    },
    company:{
        name: string;
    }
};

interface AlbumItem{
    userId: number;
    id: number;
    title: string;
};
interface Customer{
    id: number;
    name: string;
    street_address: string;
    company_name: string;
};
interface Album{
    id: number;
    title: string;
};

const isCustomerItem = (variableToCheck: any): variableToCheck is CustomerItem => {  
    return variableToCheck.company !== undefined;
  }


type PromisedCustomer = Promise<Customer[] | Album[]>

type PromisedCustomerData<T> = T extends Promise<Customer[] | Album[]> ? T : never;

const albumURL = 'https://jsonplaceholder.typicode.com/albums/1/photos'
const userURL = 'https://jsonplaceholder.typicode.com/users'

const fetchData = async (url: string): PromisedCustomerData<PromisedCustomer> => {
  const response = await fetch(url).then(response => response.json());
  
  return response.map((info: CustomerItem | AlbumItem): Customer | Album => {
    if (isCustomerItem(info)) {
      return {
        id: info.id,
        name: info.name,
        street_address: `${info.address.suite} ${info.address.street}`,
        company_name: info.company.name
      }
    } else {
      return {
        id: info.id,
        title: info.title
      }
    }
  })
}

fetchData(albumURL).then(albums => console.log(albums))
fetchData(userURL).then(users => console.log(users))