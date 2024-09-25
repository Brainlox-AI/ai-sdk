import { Button } from './components/ui/button';

export function DebalesButton() {
    return (
        <div className="text-xl font-bold  p-4 rounded-lg ">
            <Button
                onClick={() => {
                    console.log('Button clicked');
                }}
            >
                {' '}
                hello
            </Button>
        </div>
    );
}
