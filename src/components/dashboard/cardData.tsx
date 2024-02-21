import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CardData({ title, value, icon, text, style }: { title: string; value: string; icon?: JSX.Element, text?: string, style?: React.CSSProperties}) {
    return (
        <Card style={style}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {text}
                </p>
            </CardContent>
        </Card>
    );
}
