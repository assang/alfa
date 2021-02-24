<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-iterable](./alfa-iterable.md) &gt; [Iterable\_2](./alfa-iterable.iterable_2.md) &gt; [reject](./alfa-iterable.iterable_2.reject.md)

## Iterable\_2.reject() function

<b>Signature:</b>

```typescript
function reject<T, U extends T>(iterable: Iterable<T>, refinement: Refinement<T, U, [index: number]>): Iterable<Exclude<T, U>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  iterable | Iterable&lt;T&gt; |  |
|  refinement | [Refinement](./alfa-refinement.refinement.md)<!-- -->&lt;T, U, \[index: number\]&gt; |  |

<b>Returns:</b>

Iterable&lt;Exclude&lt;T, U&gt;&gt;
