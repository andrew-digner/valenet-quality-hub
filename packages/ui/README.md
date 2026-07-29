# Valenet UI

Biblioteca oficial do Design System. Os componentes usam tokens semânticos,
suportam temas claro, escuro e institucional, foco visível e layouts fluidos.

Importe componentes de `@valenet/ui` e os estilos uma vez por aplicação:

```tsx
import { Button, Card } from '@valenet/ui';
import '@valenet/ui/styles.css';
```

Ícones devem vir de Lucide, com `aria-hidden="true"` quando forem decorativos.
Novos componentes precisam ser genéricos, tipados, responsivos e testados.
