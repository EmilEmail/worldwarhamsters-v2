
export function stringListToJSX(tag: string, list:string[]) {
	let listJSX:JSX.Element[];
	switch (tag) {
		default: 
			listJSX = list.map(item => (
				<p>{item}</p>
			))
		
	}

}