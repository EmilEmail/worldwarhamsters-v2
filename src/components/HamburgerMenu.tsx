import { useState } from 'react';
import './HamburgerMenu.css'
const MenuComp = () => {
	const [showMenu, setShowMenu] = useState(false);
	const menu = ['Home', 'Random Fight', 'Gallery', 'Statistics', 'History']
	const menuJSX = menu.map(listItem => (
		<li key={listItem} onClick={() => menuClick(listItem)}>
			<h3>{listItem}</h3>
		</li>
	));

	// functions
	function menuClick(listItem: string) {
		switch (listItem) {
			case 'Home':
				alert('Home')
				break;
			case 'Random Fight':
				alert('Random Fight')
				break;
			case 'Gallery':
				alert('Gallery')
				break;
			case 'Statistics':
				alert('Statistics')
				break;
			case 'History':
				alert('History')
				break;
		}
	}
	

	

	return (
		<section className="menu-comp">
			<div className="hamburger-menu" onClick={() => setShowMenu(!showMenu)}>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<section className="the-menu">
				<ul>
					{showMenu ? menuJSX : null}
				</ul>
			</section>
		</section>
	)
}

export default MenuComp;