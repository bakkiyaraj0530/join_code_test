import { githubData } from 'containers/HomePage/Saga';
import { fetchBikes } from 'containers/Searchtheftbike/Saga';
import { caseDetails } from 'containers/CaseDetails/Saga';

export default function* rootWatchers() {
  yield [fetchBikes(), githubData(), caseDetails()];
}
