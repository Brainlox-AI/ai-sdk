import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MemoizedReactMarkdown } from './Markdown';
import { BaseMessage } from '@/types';
import { cn } from '@/lib/utils';
import { ExtendedMessageContent } from './ChatbotUi';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { ExternalLink } from 'lucide-react';
function ChatMessage({ role, content }: BaseMessage<ExtendedMessageContent>) {
    return (
        <div
            className={cn(
                'flex w-full items-start  gap-5',
                role === 'user' ? 'justify-end' : 'justify-start'
            )}
        >
            {role === 'assistant' && (
                <Avatar className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border shadow-sm">
                    <AvatarImage src="/robot.png" alt="Assistant avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            )}

            <Card
                className={cn(
                    'inline-flex  flex-col   gap-2 border-none shadow-none   max-w-[calc(100%-7.4rem)] ',
                    role === 'user' ? 'items-end  ' : 'items-start  '
                )}
            >
                <CardContent className="w-full  bg-transparent p-0 space-y-3">
                    <div
                        className={cn(
                            'p-2 px-3 rounded-lg',
                            role === 'user'
                                ? 'bg-user-message'
                                : 'bg-ai-message'
                        )}
                    >
                        <MemoizedReactMarkdown
                            className="prose prose-sm
                        dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words text-sm"
                            remarkPlugins={[remarkGfm, remarkMath]}
                            components={{
                                p({ children }) {
                                    return (
                                        <p className="mb-2 last:mb-0">
                                            {children}
                                        </p>
                                    );
                                },
                                a({ href, children, ...props }) {
                                    if (!href) {
                                        return null;
                                    }
                                    if (href.startsWith('www.')) {
                                        return (
                                            <a
                                                href={'https://' + href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                                {...props}
                                            >
                                                {children} + test
                                            </a>
                                        );
                                    }
                                    return (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-500 underline hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                            {...props}
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {content.text}
                        </MemoizedReactMarkdown>
                    </div>
                    {content.image && content.image.length > 0 && (
                        <Carousel
                            opts={{
                                align: 'start',
                            }}
                            className="w-full "
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {content.image.map((image, index) => (
                                    <CarouselItem key={index} className="w-40 ">
                                        <Card className="h-full p-2">
                                            <CardContent className="flex flex-col p-0 gap-1">
                                                <div className="aspect-square overflow-hidden rounded-lg">
                                                    <img
                                                        src={image}
                                                        alt={`Product ${index + 1}`}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                <div className=" flex flex-col flex-grow gap-1">
                                                    <h3 className="text-xs font-medium  line-clamp-1">
                                                        {content?.product?.[
                                                            index
                                                        ] || 'Product Name'}
                                                    </h3>
                                                    <span className="text-base font-bold text-green-400">
                                                        {content?.price?.[
                                                            index
                                                        ] || '$0.00'}
                                                    </span>
                                                    <a
                                                        href={
                                                            content?.link?.[
                                                                index
                                                            ] || '#'
                                                        }
                                                        rel="noopener noreferrer"
                                                        className="text-header-background  text-center py-1 px-3 rounded-md transition-colors duration-200 text-xs flex items-center justify-center gap-1"
                                                        target="_blank"
                                                    >
                                                        <span>
                                                            View Product
                                                        </span>
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    )}
                </CardContent>
            </Card>

            {role === 'user' && (
                <Avatar className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border shadow-sm">
                    <AvatarImage src="/user.png" alt="user avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

export default ChatMessage;
