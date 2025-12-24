import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockData = [
  {
    title: "Total Articles",
    value: "250",
    description: "Visitors for the last 6 months",
  },
  {
    title: "Total Project Types",
    value: "1,234",
    description: "Acquisition needs attention",
  },
  {
    title: "Total Clients",
    value: "45,678",
    description: "Engagement exceed targets",
  },
];

export default function SectionCards() {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3'>
      {mockData.map((item) => (
        <Card className='@container/card' key={item.title}>
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
              {item.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1.5 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              {item.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
