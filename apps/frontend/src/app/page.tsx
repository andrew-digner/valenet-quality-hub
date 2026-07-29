import { Badge, Card, CardContent, CardHeader } from '@valenet/ui';

export default function FoundationPage() {
  return (
    <Card className="welcome-card">
      <CardHeader>
        <Badge>Fundação da plataforma</Badge>
        <h1>Valenet Quality Hub</h1>
      </CardHeader>
      <CardContent>
        <p>Gestão corporativa da qualidade de atendimentos em um único lugar.</p>
      </CardContent>
    </Card>
  );
}
