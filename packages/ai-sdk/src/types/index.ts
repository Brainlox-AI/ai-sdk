export interface languageMap {
    [key: string]: string | undefined;
}




export type Role = 'user' | 'assistant';

export interface BaseMessageContent {
    text: string;
}

export interface BaseMessage<T extends BaseMessageContent = BaseMessageContent> {
    id: string;
    role: Role;
    createdAt: Date;
    content: T;
}

// Define a type for field mapping
// Updated field mapping type to ensure 'text' is always present
export type responsefieldMapping<T extends BaseMessageContent> = {
    text: string;
} & {
    [K in Exclude<keyof T, 'text'>]?: string;
};

// Update chat options type to include field mapping
export interface ChatOptions<T extends BaseMessageContent> {
    initialMessage?: string;
    initialInput?: string;
    apiUrl?: string;
    onError?: (error: Error) => void;
    responsefieldMapping: responsefieldMapping<T>;
}