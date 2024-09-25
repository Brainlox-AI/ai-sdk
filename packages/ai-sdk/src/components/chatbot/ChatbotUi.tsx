import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { BotIcon, Send, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import useChat from '@/hooks/useChat';

import ChatMessage from './message';
import MessageSkeleton from './MessageSkeleton';
import { useEffect, useRef } from 'react';
import { scrollToBottom } from '@/lib/utils';
import { BaseMessageContent } from '@/types';

export interface ExtendedMessageContent extends BaseMessageContent {
    image?: string[];
    link?: string[];
    product?: string[];
    price?: string[];
}
export function ChatBotUi() {
    const {
        messages,
        handleSubmit,
        handleInputChange,
        error,
        input,
        isLoading,
    } = useChat<ExtendedMessageContent>({
        initialMessage: "Hello, I'm a bot",
        apiUrl: 'https://blossomapi-sit.azurewebsites.net/query',
        responsefieldMapping: {
            text: 'response',
            image: 'image',
            link: 'link',
            product: 'product',
            price: 'price',
        },
    });
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        setTimeout(() => scrollToBottom(containerRef), 100);
    }, [messages]);
    return (
        <div className="fixed right-10 bottom-10">
            <div className="relatiive" id="dialogcontaier">
                <Dialog modal={false} defaultOpen>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <BotIcon />
                        </Button>
                    </DialogTrigger>

                    <DialogContent
                        className="max-w-64 sm:max-w-sm  fixed right-10 bottom-24 left-auto top-auto translate-x-0 translate-y-0 data-[state=open]:slide-in-from-right-0 data-[state=open]:slide-in-from-bottom-10 data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-bottom-10 p-0 gap-0"
                        onInteractOutside={(e) => e.preventDefault()}
                    >
                        <DialogHeader className="relative flex flex-row  items-start justify-center gap-2 space-y-0 bg-header-background p-4 sm:rounded-t-lg ">
                            <div className="inline-flex">
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-1 flex items-center justify-between text-header-font">
                                <DialogTitle className="flex flex-col items-start">
                                    <span className="font-medium">
                                        Chat with{' '}
                                    </span>{' '}
                                    <span>Demo</span>
                                </DialogTitle>
                                <DialogClose className=" rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close</span>
                                </DialogClose>
                            </div>
                        </DialogHeader>

                        <div
                            ref={containerRef}
                            className=" flex flex-col gap-4 h-80 p-4 pb-0 w-full sm:max-w-sm overflow-x-hidden overscroll-y-auto"
                        >
                            {messages.map((message, index) => (
                                <ChatMessage key={index} {...message} />
                            ))}

                            {isLoading ? <MessageSkeleton /> : null}
                            {error && <div>{error.message}</div>}
                        </div>

                        <DialogFooter className="sm:justify-start p-4">
                            <form
                                className="w-full flex flex-row items-center justify-center border shadow-sm rounded-md focus-within:border-black"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    className="flex-1 rounded-s-md   sm:text-sm appearance-none  p-3 focus-visible:outline-none"
                                    placeholder="Your question.."
                                    onChange={handleInputChange}
                                    value={input}
                                />
                                <button
                                    type="submit"
                                    className="w-10 flex items-center justify-center"
                                >
                                    <Send />
                                </button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
