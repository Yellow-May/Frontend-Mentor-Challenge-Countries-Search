import { Routes, Route } from 'react-router-dom';

import Countries from 'pages/Countries';
import Country from 'pages/Country';
import LayoutWrapper from 'components/LayoutWrapper';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LayoutWrapper />}>
				<Route index element={<Countries />} />
				<Route path=':name' element={<Country />} />
			</Route>
		</Routes>
	);
}

export default App;
