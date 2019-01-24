import { githubData } from 'containers/HomePage/Saga';
import { fetchBikes } from 'containers/Searchtheftbike/Saga';


export default function* rootWatchers() {
  yield [
    fetchBikes(),
    githubData(),    
  ];
}
