import {
  Link,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack
} from "@mui/material";
import { Repository } from "../../models/Repository";
import StarsIcon from '@mui/icons-material/Stars';
import AltRouteIcon from '@mui/icons-material/AltRoute';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = (props: RepositoryCardProps) => {
  const { repository } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {repository.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Ostatnia aktualizacja: ${repository.updatedAt.replace("Z", "").split("T").join(" ")}`}
        </Typography>
        <Typography variant="body2" gutterBottom>{repository.description}</Typography>
        <Stack direction="row" spacing={1}>
          <Chip icon={<StarsIcon />} label={repository.stargazers.totalCount} />
          <Chip icon={<AltRouteIcon />} label={repository.forks.totalCount} />
        </Stack>
      </CardContent>
      {repository?.homepageUrl ? (
        <CardActions>
          <Link
            target="_blank"
            underline="none"
            href={repository.homepageUrl}
            rel="noopener noreferrer"
          >
            <Button size="small">Strona Domowa</Button>
          </Link>
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default RepositoryCard;
