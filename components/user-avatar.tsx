import { CurrentUser } from "@stackframe/stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

const defaultSize = 32

export default function UserAvatar({user,size}: {user: CurrentUser, size?: number}) {
    return (
        <Avatar style={{height: size || defaultSize, width: size || defaultSize}}>
            <AvatarImage src={user.profileImageUrl || ''}/>
            <AvatarFallback>
                {user.displayName?
                <span className="font-medium" style={{fontSize: (size || defaultSize)*0.4}}>{user.displayName.slice(0,2)}</span>
                :<Icons.userRound size={(size || defaultSize)*0.6}/>}
            </AvatarFallback>
        </Avatar>
    );
}