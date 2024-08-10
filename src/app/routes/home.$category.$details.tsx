import { json } from '@remix-run/router';
import { CardDetails } from 'features/CardDetails';
import { DEFAULT_CATEGORY } from 'shared/consts';
import { getDetailsData } from 'shared/lib/api';
import { SearchParams } from 'shared/types';

export const loader = async ({ params }: { params: { details: string } }) => {
  try {
    const card = params[SearchParams.DETAILS];
    const details = await getDetailsData({ category: DEFAULT_CATEGORY, card });

    return json(details);
  } catch {
    throw new Response(null, { status: 404 });
  }
};

const DetailsPage = () => {
  return <CardDetails />;
};

export default DetailsPage;
