using System.Net;
using System.Text.Json;

namespace Bff.Api.Middleware;

public sealed class GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await next(httpContext);
        }
        catch (HttpRequestException exception)
        {
            logger.LogError(exception, "Error HTTP al consumir servicio externo.");

            await WriteProblemDetailsAsync(
                httpContext,
                statusCode: HttpStatusCode.BadGateway,
                title: "Error al consumir servicio externo",
                detail: exception.Message
            );
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Error no controlado.");

            await WriteProblemDetailsAsync(
                httpContext,
                statusCode: HttpStatusCode.InternalServerError,
                title: "Error interno del servidor",
                detail: "Ocurrió un error inesperado. Revisa los logs para más detalle."
            );
        }
    }

    private static async Task WriteProblemDetailsAsync(
        HttpContext httpContext,
        HttpStatusCode statusCode,
        string title,
        string detail)
    {
        httpContext.Response.ContentType = "application/problem+json";
        httpContext.Response.StatusCode = (int)statusCode;

        var problemDetails = new
        {
            type = "about:blank",
            title,
            status = (int)statusCode,
            detail,
            traceId = httpContext.TraceIdentifier
        };

        await httpContext.Response.WriteAsync(JsonSerializer.Serialize(problemDetails));
    }
}
