import { Button } from '@kreativeclub/ui';

const MyButton = () => {
	return <Button
		variant="danger"
		onClick={() =>
			console.log('clicked')
		}
	>
		Hellod
	</Button>
}

export default MyButton