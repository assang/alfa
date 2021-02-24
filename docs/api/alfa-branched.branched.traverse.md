<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-branched](./alfa-branched.md) &gt; [Branched](./alfa-branched.branched.md) &gt; [traverse](./alfa-branched.branched.traverse.md)

## Branched.traverse() function

<b>Signature:</b>

```typescript
function traverse<T, U, B>(values: Iterable<T>, mapper: Mapper<T, Branched<U, B>>): Branched<Iterable<U>, B>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  values | Iterable&lt;T&gt; |  |
|  mapper | [Mapper](./alfa-mapper.mapper.md)<!-- -->&lt;T, [Branched](./alfa-branched.branched.md)<!-- -->&lt;U, B&gt;&gt; |  |

<b>Returns:</b>

[Branched](./alfa-branched.branched.md)<!-- -->&lt;Iterable&lt;U&gt;, B&gt;
