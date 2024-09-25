import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
function MessageSkeleton() {
    return (
        <div className="flex w-full items-start justify-start gap-5 ">
            <Avatar className="relative  flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border    shadow-sm">
                <AvatarImage src="/robot.png" alt="avatar" />
                <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <Card className="flex w-full flex-col items-start  gap-2 border-none ">
                <CardContent className="flex w-full flex-col gap-2 overflow-hidden bg-transparent p-0">
                    <Skeleton className="h-[20px] w-3/4 " />
                    <Skeleton className="h-[20px] w-2/4 " />
                    <Skeleton className="h-[20px] w-1/4 " />
                </CardContent>
            </Card>
        </div>
    );
}

export default MessageSkeleton;
