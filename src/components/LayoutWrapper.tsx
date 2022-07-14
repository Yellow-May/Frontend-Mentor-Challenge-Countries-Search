import { Outlet } from 'react-router-dom';

const LayoutWrapper = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default LayoutWrapper;
