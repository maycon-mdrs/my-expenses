export function RecentData({ date, title, description, value }: { date?: string, title: string; description: string; value: string }) {
    return (
        <>
            <div className="space-y-8 mb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{title}</p>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="ml-auto font-medium">{value}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
