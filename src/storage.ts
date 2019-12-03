import { Store, set } from 'idb-keyval';

const customStore = new Store('custom-db-name', 'custom-store-name');
set('foo', 'bar', customStore);