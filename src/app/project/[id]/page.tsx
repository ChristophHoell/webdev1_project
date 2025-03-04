import { db } from '@/app/db';
import { projectTable, taskTable } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

import { TaskList } from './task-list';

export default async function Project(props: {
    params: Promise<{ id: number }>
  }) {
    const { id }  = await props.params;
    const tasks = await db.select().from(taskTable).where(eq(taskTable.projectId, id));

    return (
        <TaskList projectId={id} tasks={tasks} />
    );
}